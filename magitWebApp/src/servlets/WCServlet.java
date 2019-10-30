package servlets;

import com.google.gson.Gson;
import utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static constants.Constants.REPOSITORY;

@WebServlet(name = "WCServlet", urlPatterns = {"/WC"})
public class WCServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }


    // SAVE
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter= SessionUtils.getUsername(request);
        String repoName=request.getParameter(REPOSITORY);
        BufferedReader reader = request.getReader();
        Gson gson = new Gson();
        FileToAdd fileToAdd = gson.fromJson(reader, FileToAdd.class);

        fileToAdd.FlashFile(userNameFromParameter, repoName);
    }

    // COMMIT
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }


    public class FileToAdd {
        public List<String> tree;
        public String fileName;
        public String content;

        public List<String> getTree() {
            return tree;
        }

        public void setTree(List<String> tree) {
            this.tree = tree;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public void FlashFile(String i_userName, String i_repoName) throws IOException {
            File file = buildPath(i_userName, i_repoName).toFile();
            file.createNewFile();

            FileWriter writer = new FileWriter(file, false);
            writer.write(content);
            writer.close();
        }


        private Path buildPath(String i_userName, String i_repoName){
            String res =
                    CollaborationServlet.rootPath + File.separator + i_userName + File.separator + i_repoName;
            for(String str : tree){
                res += str + File.separator;
            }
            res += fileName;

            return Paths.get(res);
        }
    }

}
