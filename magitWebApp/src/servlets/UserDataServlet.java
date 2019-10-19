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

import static constants.Constants.*;

@WebServlet(name = "UserDataServlet", urlPatterns = {"/userData"})
public class UserDataServlet extends HttpServlet {

    /*
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String userNameFromParameter=request.getParameter(USERNAME);
        Gson gson = new Gson();
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
    }

     */
}
