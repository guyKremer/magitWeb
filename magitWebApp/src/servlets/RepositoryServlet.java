package servlets;

import Engine.MagitObjects.FolderItems.Blob;
import com.google.gson.Gson;
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
import java.util.Collection;
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
            xmlUtiles.LoadXmlEx3(fileContent.toString(), userNameFromParameter);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter= SessionUtils.getUsername(request);
        Path userFolder = Paths.get("C:"+ File.separator+"magit-ex3"+ File.separator+userNameFromParameter);

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(userFolder)) {
            for (Path entry : stream) {
                
            }
        }
        ServletUtils.SendJsonResponse(response,userNameFromParameter);
    }

    private String readFromInputStream(InputStream inputStream) {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

}
