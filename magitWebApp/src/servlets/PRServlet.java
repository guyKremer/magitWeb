package servlets;

import Engine.MagitObjects.Branch;
import Engine.MagitObjects.RTBranch;
import Engine.MagitObjects.Repository;
import com.google.gson.JsonArray;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

import static constants.Constants.REMOTEUSER;
import static constants.Constants.REPOSITORY;

@WebServlet(name = "PRServlet", urlPatterns = {"/PR"})
public class PRServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String repoName = request.getParameter(REPOSITORY);
        String remoteUser = request.getParameter(REMOTEUSER);
        String baseBranch = request.getParameter("baseBranch");
        String targetBranch = request.getParameter("targetBranch");
        Repository remoteRepo = null;

        //find repo
        for (Repository repo : userManager.getRepositories(userNameFromParameter)) {
            if (repo.GetName().equals(repoName)) {
                remoteRepo = repo;
                break;
            }
        }


    }

    // get RTBs && RBs
    public  void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        String repoName = request.getParameter(REPOSITORY);
        String type = request.getParameter("type");
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        Repository currRepo = null;
        JsonArray jsonArray = new JsonArray();

        //find repo
        for (Repository repo : userManager.getRepositories(userNameFromParameter)) {
            if (repo.GetName().equals(repoName)) {
                currRepo = repo;
                break;
            }
        }

        for (Branch branch : currRepo.GetBranches().values()) {
            if (type.equals("RTB")) {
                if (branch.getClass().equals(RTBranch.class)) {
                    jsonArray.add(branch.getName());
                }
            }else {//RB
                    if (branch.getName().contains(File.separator)) {
                        jsonArray.add(branch.getName());
                    }
                }
            }


            ServletUtils.SendJsonResponse(response, jsonArray);

        }

}
