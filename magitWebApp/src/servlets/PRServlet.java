package servlets;

import Engine.Engine;
import Engine.MagitObjects.Branch;
import Engine.MagitObjects.PRRequest;
import Engine.MagitObjects.RTBranch;
import Engine.MagitObjects.Repository;
import com.google.gson.JsonArray;
import users.ForkMessage;
import users.PRMessage;
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
import java.nio.file.Paths;

import static constants.Constants.REMOTEUSER;
import static constants.Constants.REPOSITORY;

@WebServlet(name = "PRServlet", urlPatterns = {"/PR"})
public class PRServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String repoName = request.getParameter(REPOSITORY);
        Repository currRepo = null;
        JsonArray jsonArray = new JsonArray();

        //find repo
        for (Repository repo : userManager.getRepositories(userNameFromParameter)) {
            if (repo.GetName().equals(repoName)) {
                currRepo = repo;
                break;
            }
        }

        for(PRRequest pr : currRepo.getPrRequests()){
            jsonArray.add(pr.toJson());
        }

        ServletUtils.SendJsonResponse(response, jsonArray);
    }


        public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String repoName = request.getParameter(REPOSITORY);
        String remoteUser = request.getParameter(REMOTEUSER);
        String baseBranch = request.getParameter("baseBranch");
        String targetBranch = request.getParameter("targetBranch");
        String PRMsg = request.getParameter("msg");
        Repository remoteRepo = null;
        Engine engine = new Engine();

        //targetBranch = Paths.get(targetBranch).getFileName().toString();

        //find repo
        for (Repository repo : userManager.getRepositories(remoteUser)) {
            if (repo.GetName().equals(repoName)) {
                remoteRepo = repo;
                break;
            }
        }

        engine.createPRData(remoteRepo,baseBranch,targetBranch,userNameFromParameter,PRMsg);
        PRMessage prMessage = new PRMessage(remoteRepo.GetName(),remoteUser,userNameFromParameter,targetBranch,baseBranch,PRMsg);
        userManager.usersMap.get(remoteUser).AddMessage(prMessage);
    }

    // get RTBs && RBs
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
            } else if (branch.getName().contains(File.separator)) {
                jsonArray.add(branch.getName());
            }
        }
        ServletUtils.SendJsonResponse(response,jsonArray);
    }

}
