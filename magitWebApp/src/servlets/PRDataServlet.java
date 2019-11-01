package servlets;

import Engine.MagitObjects.Changes;
import Engine.MagitObjects.PRRequest;
import Engine.MagitObjects.Repository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

import static constants.Constants.REPOSITORY;

@WebServlet(name = "PRServlet", urlPatterns = {"/PRData"})
public class PRDataServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String repoName = request.getParameter(REPOSITORY);
        String date = request.getParameter("date");
        Repository currRepo = null;
        PRRequest pr;
        JsonArray jsonArray = new JsonArray();
        JsonArray inner = new JsonArray();

        //find repo
        for (Repository repo : userManager.getRepositories(userNameFromParameter)) {
            if (repo.GetName().equals(repoName)) {
                currRepo = repo;
                break;
            }
        }

        pr = currRepo.GetPRByDate(date);

        for (Map.Entry<String, List<Changes>> entry : pr.getPrData().entrySet()){
            for(Changes changes : entry.getValue()){
                inner.add(changes.toJson());
            }
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("path", entry.getKey());
            jsonObject.add("changes",inner);
            jsonArray.add(jsonObject);

            jsonObject = new JsonObject();
            inner = new JsonArray();
        }

        ServletUtils.SendJsonResponse(response, jsonArray);
    }




}
