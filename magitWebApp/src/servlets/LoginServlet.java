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

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();

        String userNameFromParameter = gson.fromJson(reader, String.class);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());

        synchronized (this){
            if(userManager.isUserExists(userNameFromParameter)){
                response.setStatus(HttpServletResponse.SC_CONFLICT);
            }
            else{
                userManager.addUser(userNameFromParameter);
                request.getSession(true).setAttribute(Constants.USERNAME, userNameFromParameter);
                ServletUtils.SendJsonResponse(response,userNameFromParameter);
            }
        }
    }
}
