package servlets;


import Engine.MagitObjects.Branch;
import Engine.MagitObjects.Commit;
import Engine.MagitObjects.Repository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import users.Message;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static constants.Constants.*;

@WebServlet(name = "CommitsServlet", urlPatterns = {"/commits"})
public class CommitsServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter= SessionUtils.getUsername(request);
        String repoName=request.getParameter(REPOSITORY);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String branchName=request.getParameter(BRANCH);

        Commit commit;
        Repository currRepo = null;
        JsonArray jsonArray;

        List<Repository> userRepos = userManager.getRepositories(userNameFromParameter);

        //find repo
        for(Repository repo : userRepos){
            if(repo.GetName().equals(repoName)){
                currRepo = repo;
                break;
            }
        }

        Repository.m_repositoryPath = Paths.get(CollaborationServlet.rootPath + File.separator + currRepo.GetName());
        Repository.m_pathToMagitDirectory = Repository.m_repositoryPath.resolve(".magit");

        jsonArray = getAllBranchCommits(currRepo, branchName);
        //commit = new Commit(currRepo.GetHeadBranch().getCommitSha1());
        //userManager.usersMap.get(userNameFromParameter).setRootFolder(commit.getRootFolder());
        ServletUtils.SendJsonResponse(response, jsonArray);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String userNameFromParameter= SessionUtils.getUsername(request);
        String repoName=request.getParameter(REPOSITORY);
        String sha1=request.getParameter(SHA1);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        Commit commit;
        Repository currRepo = null;

        List<Repository> userRepos = userManager.getRepositories(userNameFromParameter);

        //find repo
        for(Repository repo : userRepos){
            if(repo.GetName().equals(repoName)){
                currRepo = repo;
                break;
            }
        }
        Repository.m_repositoryPath = Paths.get(CollaborationServlet.rootPath + File.separator + currRepo.GetName());
        Repository.m_pathToMagitDirectory = Repository.m_repositoryPath.resolve(".magit");
        if(sha1.equals("0")){
            //commit = new Commit(currRepo.GetHeadBranch().getCommitSha1());
            commit = currRepo.GetCurrentCommit();
            userManager.usersMap.get(userNameFromParameter).setRootFolder(commit.getRootFolder());
        }
        else{
            commit = new Commit(sha1);
            userManager.usersMap.get(userNameFromParameter).setRootFolder(commit.getRootFolder());
        }
    }

    public JsonArray getAllBranchCommits(Repository i_repo, String i_branch) throws IOException {
        JsonArray jsonArray = new JsonArray();
        Commit firstCommit = new Commit(i_repo.GetBranches().get(i_branch).getCommitSha1());
        Commit secondCommit = null;
        String pointedBranches = "";

        while(firstCommit.getSha1() != null && !firstCommit.getSha1().equals("")){

            for (Map.Entry<String, Branch> entry : i_repo.GetBranches().entrySet()) {
                if(entry.getValue().getCommitSha1().equals(firstCommit.getSha1())){
                    pointedBranches += entry.getKey() + " ";
                }
            }

            jsonArray.add(new CommitDetails(
                    firstCommit.getSha1(),
                    firstCommit.getMessage(),
                    firstCommit.getDateOfCreation(),
                    firstCommit.getCreator(),
                    pointedBranches).toJson());

            pointedBranches = "";

            if(!firstCommit.getFirstPrecedingSha1().isEmpty()) {
                firstCommit = new Commit(firstCommit.getFirstPrecedingSha1());
            }
            else{
                break;
            }
        }

        return jsonArray;
    }

    public class CommitDetails{
        private String sha1;
        private String msg;
        private String date;
        private String creator;
        private String pointedBranches;

        public CommitDetails(String i_sha1, String i_msg, String i_date, String i_creator, String i_pointedBranches){
            sha1 = i_sha1;
            msg = i_msg;
            date = i_date;
            creator = i_creator;
            pointedBranches = i_pointedBranches;
        }

        public JsonObject toJson(){
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("sha1",sha1);
            jsonObject.addProperty("message",msg);
            jsonObject.addProperty("date",date);
            jsonObject.addProperty("creator",creator);
            jsonObject.addProperty("pointedBranches",pointedBranches);

            return jsonObject;
        }

    }
}
