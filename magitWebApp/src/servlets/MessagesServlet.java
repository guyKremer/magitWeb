package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import constants.Constants;
import users.Message;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


import static constants.Constants.*;

@WebServlet(name = "MessagesServlet", urlPatterns = {"/messages"})
public class MessagesServlet extends HttpServlet{

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        List<Message> msgList = userManager.getAllMessages(userNameFromParameter);
        JsonArray jsonArray = new JsonArray();
        for (Message msg : msgList) {
            if(!msg.isOpened()) {
                jsonArray.add(msg.toJson());
            }
        }
        ServletUtils.SendJsonResponse(response,jsonArray);
    }

}