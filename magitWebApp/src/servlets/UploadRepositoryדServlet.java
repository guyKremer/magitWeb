package servlets;

import javafx.fxml.FXML;
import xmlFormat.xmlUtiles;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Scanner;

@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class UploadRepositoryדServlet  extends HttpServlet{

//taken from: http://www.servletworld.com/servlet-tutorials/servlet3/multipartconfig-file-upload-example.html
// and http://docs.oracle.com/javaee/6/tutorial/doc/glraq.html

        @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            response.sendRedirect("fileupload/form.html");
        }

        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            response.setContentType("text/html");

            Collection<Part> parts = request.getParts();

            StringBuilder fileContent = new StringBuilder();

            for (Part part : parts) {

                //to write the content of the file to a string
                fileContent.append(readFromInputStream(part.getInputStream()));
            }

            try {
                //xmlUtiles.LoadXmlEx3(fileContent.toString(),);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        private void printPart(Part part, PrintWriter out) {
            StringBuilder sb = new StringBuilder();
            sb.append("<p>")
                    .append("Parameter Name (From html form): ").append(part.getName())
                    .append("<br>")
                    .append("Content Type (of the file): ").append(part.getContentType())
                    .append("<br>")
                    .append("Size (of the file): ").append(part.getSize())
                    .append("<br>");
            for (String header : part.getHeaderNames()) {
                sb.append(header).append(" : ").append(part.getHeader(header)).append("<br>");
            }
            sb.append("</p>");
            out.println(sb.toString());

        }

        private String readFromInputStream(InputStream inputStream) {
            return new Scanner(inputStream).useDelimiter("\\Z").next();
        }

        private void printFileContent(String content, PrintWriter out) {
            out.println("<h2>File content:</h2>");
            out.println("<textarea style=\"width:100%;height:400px\">");
            out.println(content);
            out.println("</textarea>");
        }
    }


