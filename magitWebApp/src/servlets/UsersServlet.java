package servlets;

import com.google.gson.Gson;
import constants.Constants;
import users.UserManager;
import utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


import static constants.Constants.*;

@WebServlet(name = "UsersServlet", urlPatterns = {"/users"})
public class UsersServlet extends HttpServlet{

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        Set<String> users =  userManager.getUsers();
        List<String> userNamesArray = new ArrayList<>();

        for(String user : users){
            userNamesArray.add(user);
        }

        ServletUtils.SendJsonResponse(response,userNamesArray);
    }
}
