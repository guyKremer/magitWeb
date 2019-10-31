package servlets;

import Engine.Engine;
import Engine.MagitObjects.LocalRepository;
import Engine.MagitObjects.Repository;
import users.ForkMessage;
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
import java.nio.file.Paths;

import static constants.Constants.*;

@WebServlet(name = "CollaborationServlet", urlPatterns = {"/collaboration"})
public class CollaborationServlet extends HttpServlet {
    public static final String rootPath = "c:\\magit-ex3";

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        String userNameFromParameter = SessionUtils.getUsername(request);
        String repoName = request.getParameter(REPOSITORY);
        String remoteUser = request.getParameter(REMOTEUSER);
        String operation = request.getParameter(OPERATION);
        Repository localRepo = getUserRepo(userNameFromParameter,repoName);
        Repository remoteRepo =getUserRepo(remoteUser, ((LocalRepository)localRepo).getRemoteRepoName());
        engine.setCurrentRepository(localRepo);

        /*
        Repository.m_repositoryPath =
                Paths.get(CollaborationServlet.rootPath + File.separator + remoteUser + File.separator + remoteRepo.GetName());
        Repository.m_pathToMagitDirectory = Repository.m_repositoryPath.resolve(".magit");
         */
        if(operation.equals("push")){
            engine.PushNewBranch((LocalRepository)localRepo,remoteRepo,userNameFromParameter,remoteUser);
        }
        else if(operation.equals("pull")) { // pull
            engine.Pull((LocalRepository)localRepo,remoteRepo,userNameFromParameter,remoteUser);
        }

        //check response
    }

    //fork
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Engine engine = new Engine();
        String userNameFromParameter = SessionUtils.getUsername(request);
        String remoteUser = request.getParameter(REMOTEUSER);
        String remoteRepo = request.getParameter(REMOTEREPO);
        String localRepo = request.getParameter(LOCALREPO);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        Repository rr = null;
        LocalRepository lr = null;

        File RR = new File(rootPath + File.separator + remoteUser + File.separator + remoteRepo);
        File LR = new File (rootPath + File.separator + userNameFromParameter + File.separator + localRepo);


        //find repo
        for(Repository repo : userManager.getRepositories(remoteUser)){
            if(repo.GetName().equals(remoteRepo)){
                rr = repo;
                break;
            }
        }

        lr = engine.Clone(rr, RR.getAbsolutePath(),LR,localRepo);

        userManager.usersMap.get(userNameFromParameter).
                getRepositories().add(lr);

        userManager.usersMap.get(remoteUser).AddMessage(new ForkMessage(remoteRepo,userNameFromParameter));
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
