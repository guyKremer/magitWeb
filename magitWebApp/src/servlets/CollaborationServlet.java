package servlets;

import Engine.Engine;
import Engine.MagitObjects.Repository;
import users.User;
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

import static constants.Constants.*;

@WebServlet(name = "CollaborationServlet", urlPatterns = {"/collaboration"})
public class CollaborationServlet extends HttpServlet {
    private static final String rootPath = "c:\\magit-ex3";

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        String userNameFromParameter = SessionUtils.getUsername(request);
        String repoName = request.getParameter(REPOSITORY);
        String operation = request.getParameter(OPERATION);
        Repository repo = getUserRepo(userNameFromParameter,repoName);
        engine.setCurrentRepository(repo);

        if(operation.equals("push")){
            engine.Push();
        }
        else if(operation.equals("pull")) { // pull
            engine.Pull();
        }

        //check response
    }

    //fork
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        String userNameFromParameter = SessionUtils.getUsername(request);
        String remoteUser = request.getParameter(USERNAME);
        String remoteRepo = request.getParameter(REMOTEREPO);
        String localRepo = request.getParameter(LOCALREPO);

        File RR = new File(rootPath + File.separator + remoteUser + File.separator + remoteRepo);
        File LR = new File (rootPath + File.separator + userNameFromParameter + File.separator + localRepo);
        engine.Clone(RR,LR,localRepo);

        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        userManager.usersMap.get(userNameFromParameter).
                getRepositories().add(new Repository(localRepo,LR.getAbsolutePath(),true));

        //check response
    }


    private Repository getUserRepo(String userNameFromParameter, String repoName) {
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        User user = userManager.usersMap.get(userNameFromParameter);
        Repository res = null;

        for(Repository repo : user.getRepositories()){
            if(repo.GetName().equals(repoName)){
                res = repo;
                break;
            }
        }
        return res;
    }

}
