package servlets;

import Engine.MagitObjects.Repository;
import com.google.gson.JsonArray;
import com.sun.corba.se.impl.orbutil.RepositoryIdStrings;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static constants.Constants.*;

@WebServlet(name = "userReposServlet", urlPatterns = {"/userRepos"})
public class userReposServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        String branchName = request.getParameter(USERNAME);

        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        JsonArray jsonArray = new JsonArray();

        for(Repository repo : userManager.getRepositories(userNameFromParameter)){
            jsonArray.add(repo.GetName());
        }

    }
}
