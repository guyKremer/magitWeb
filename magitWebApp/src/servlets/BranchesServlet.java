package servlets;

import Engine.Engine;
import Engine.MagitObjects.Branch;
import Engine.MagitObjects.Commit;
import Engine.MagitObjects.Repository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.org.apache.regexp.internal.RE;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static constants.Constants.*;

@WebServlet(name = "BranchesServlet", urlPatterns = {"/branches"})
public class BranchesServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter= SessionUtils.getUsername(request);
        String repoName=request.getParameter(REPOSITORY);
        Repository currRepo = null;
        List<String> branches = new ArrayList<>();
        JsonArray jsonArray = new JsonArray();
        UserManager userManager = ServletUtils.getUserManager(getServletContext());

        //find repo
        for(Repository repo : userManager.getRepositories(userNameFromParameter)){
            if(repo.GetName().equals(repoName)){
                currRepo = repo;
                break;
            }
        }

        for(Branch branch : currRepo.GetBranches().values()){
            if(currRepo.GetHeadBranch().getName().equals(branch.getName())){
                branches.add(0,branch.getName());
            }else{
                branches.add(branch.getName());
            }
        }

        for(String branch : branches){
            jsonArray.add(branch);
        }

        ServletUtils.SendJsonResponse(response, jsonArray);
    }

    //checkout
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        String userNameFromParameter= SessionUtils.getUsername(request);
        String repoName=request.getParameter(REPOSITORY);
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        String branchName = gson.fromJson(reader, String.class);
        branchName = branchName.replace("^^"," ");
        branchName = branchName.replace('^', '\\');
        //System.out.println(branchName);
        //String branchName = request.getParameter(BRANCH);
        Repository currRepo = null;
        Commit commit;
        UserManager userManager = ServletUtils.getUserManager(getServletContext());

        //find repo
        for(Repository repo : userManager.getRepositories(userNameFromParameter)){
            if(repo.GetName().equals(repoName)){
                currRepo = repo;
                break;
            }
        }


        engine.setCurrentRepository(currRepo);
        if(engine.isOpenChangesEx3()){
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("msg","you have open changes please commit them first");
            ServletUtils.SendErrorResponse(response,jsonObject);
        }else {
            engine.checkOut(branchName);
            commit = new Commit(currRepo.GetHeadBranch().getCommitSha1(), currRepo.m_repositoryPath);
            userManager.usersMap.get(userNameFromParameter).setRootFolder(commit.getRootFolder());
        }
    }


    //new branch
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String userNameFromParameter = SessionUtils.getUsername(request);
        String repoName = request.getParameter(REPOSITORY);
        String sha1 = request.getParameter(SHA1);
        String newBranch = request.getParameter(BRANCH);
        Repository currRepo = null;
        Branch branch;

        //find repo
        for (Repository repo : userManager.getRepositories(userNameFromParameter)) {
            if (repo.GetName().equals(repoName)) {
                currRepo = repo;
                break;
            }
        }

        /*
        Repository.m_repositoryPath =
                Paths.get(CollaborationServlet.rootPath + File.separator + userNameFromParameter + File.separator + currRepo.GetName());
        Repository.m_pathToMagitDirectory = Repository.m_repositoryPath.resolve(".magit");
        */
        engine.setCurrentRepository(currRepo);

        if (sha1.isEmpty()) {
            engine.AddBranch(newBranch,true);
        } else {
            branch = new Branch(currRepo.GetPathToMagitDirectory().resolve("branches").resolve(newBranch),sha1,currRepo.m_repositoryPath);
            currRepo.InsertBranch(branch);
            currRepo.checkOut(newBranch);
        }

    }

}
