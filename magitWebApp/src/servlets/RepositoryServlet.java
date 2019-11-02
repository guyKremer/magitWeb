package servlets;

import Engine.MagitObjects.Commit;
import Engine.MagitObjects.FolderItems.Blob;
import Engine.MagitObjects.LocalRepository;
import Engine.MagitObjects.Repository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import constants.Constants;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;
import xmlFormat.xmlUtiles;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Scanner;

import static constants.Constants.*;

@WebServlet(name = "UserDataServlet", urlPatterns = {"/repositories"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class RepositoryServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter=request.getParameter(USERNAME);
        Gson gson = new Gson();
        UserManager userManager = ServletUtils.getUserManager(getServletContext());

        Collection<Part> parts = request.getParts();

        StringBuilder fileContent = new StringBuilder();

        for (Part part : parts) {
            //to write the content of the file to a string
            fileContent.append(readFromInputStream(part.getInputStream()));
        }

        try {
            xmlUtiles.LoadXmlEx3(fileContent.toString(), userNameFromParameter,
                    Paths.get(CollaborationServlet.rootPath + File.separator + userNameFromParameter));
            getAllRepos(userNameFromParameter);
        } catch (Exception e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("msg",e.getMessage());
            ServletUtils.SendErrorResponse(response,jsonObject);
        }


    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter= SessionUtils.getUsername(request);
        String userName = request.getParameter(USERNAME);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String type;
        JsonArray repositoryDetailsList = new JsonArray();
        String RRname = null;
        String RRuser = null;

        for(Repository repo : userManager.getRepositories(userName)){
            Commit commit = repo.GetCurrentCommit();

            if(repo.getClass().equals(LocalRepository.class)){
                type = "LR";
            }else{
                type = "RR";
            }

            if(type.equals("LR")){
                RRname = ((LocalRepository)repo).getRemoteRepoName();
                RRuser = Paths.get((((LocalRepository)repo).getRemoteRepoLocation())).getParent().getFileName().toString();
            }

            repositoryDetailsList.add(
                    new RepositoryDetails(
                            type,
                            repo.GetName(),
                            repo.GetHeadBranch().getName(),
                            repo.GetBranches().size(),
                            commit.getDateOfCreation(),
                            commit.getMessage(),
                            RRname,
                            RRuser
                    ).toJson());
        }

        ServletUtils.SendJsonResponse(response, repositoryDetailsList);
    }



    private void getAllRepos(String i_userName) throws IOException {
        //String userNameFromParameter= SessionUtils.getUsername(request);
        List<Repository> repositoryList = new ArrayList<>();
        Repository repo;
        String type;
        List<RepositoryDetails> repositoryDetailsList = new ArrayList<>();
        String RRname = null;
        String RRuser = null;
        File[] directories =
                new File("c:\\magit-ex3" +File.separator + i_userName ).listFiles(File::isDirectory);

        for(File file : directories) {
            List<String> lines = Files.readAllLines(Paths.get(file.getAbsolutePath()).resolve(".magit").resolve("RepoName"));
            if (lines.size() == 1) {
                repo = new Repository(lines.get(0), file.getAbsolutePath(), true);
            } else {
                repo = new LocalRepository(lines.get(0), file.getAbsolutePath(), true, lines.get(1), lines.get(2));
            }
            Commit commit = repo.GetCurrentCommit();
            if(repo.getClass().equals(LocalRepository.class)){
                type = "LR";
            }else{
                type = "RR";
            }
            if(type.equals("LR")){
                RRname = ((LocalRepository)repo).getRemoteRepoName();
                RRuser = (repo.GetRepositoryPath().getParent()).getFileName().toString();
            }
            repositoryDetailsList.add(
                    new RepositoryDetails(
                            type,
                            repo.GetName(),
                            repo.GetHeadBranch().getName(),
                            repo.GetBranches().size(),
                            commit.getDateOfCreation(),
                            commit.getMessage(),
                            RRname,
                            RRuser
                    ));

            repositoryList.add(repo);
        }

        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        userManager.addRepositories(i_userName ,repositoryList);
    }

    private String readFromInputStream(InputStream inputStream) {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

    public class RepositoryDetails{
        public String type;
        public String repoName;
        public String activeBranch;
        public int amountOfBranches;
        public String lastCommitDate;
        public String lastCommitMsg;
        public String RRname = null;
        public String RRuser =null;

        public RepositoryDetails(String i_type,
                                 String i_repoName,
                                 String i_activeBranch,
                                 int i_amountOfBranches,
                                 String i_lastCommitDate,
                                 String i_lastCommitMsg,
                                 String i_RRname,
                                 String i_RRuser){
            type = i_type;
            repoName = i_repoName;
            activeBranch = i_activeBranch;
            amountOfBranches = i_amountOfBranches;
            lastCommitDate = i_lastCommitDate;
            lastCommitMsg = i_lastCommitMsg;
            RRname = i_RRname;
            RRuser = i_RRuser;
        }

        public JsonObject toJson(){
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("repositoryName",repoName);
            jsonObject.addProperty("activeBranch",activeBranch);
            jsonObject.addProperty("amountOfBranches",amountOfBranches);
            jsonObject.addProperty("lastCommitDate",lastCommitDate);
            jsonObject.addProperty("lastCommitMsg",lastCommitMsg);
            jsonObject.addProperty("type",type);
            jsonObject.addProperty("RRname", RRname);
            jsonObject.addProperty("RRuser", RRuser);

            return jsonObject;
        }
    }

}
