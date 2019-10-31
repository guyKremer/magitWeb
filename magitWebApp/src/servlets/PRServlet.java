package servlets;

import Engine.MagitObjects.PRRequest;
import users.UserManager;
import utils.ServletUtils;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static constants.Constants.*;

public class PRServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String userNameFromParameter = SessionUtils.getUsername(request);
        String remoteRepo = request.getParameter(REPOSITORY);
        String remoteUser = request.getParameter(REMOTEUSER);
        String basisBranch = request.getParameter(BASISBRANCH);
        String targetBranch = request.getParameter(TARGETBRANCH);

        new PRRequest()

    }
}
