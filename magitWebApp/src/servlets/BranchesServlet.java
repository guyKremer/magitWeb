package servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(name = "BranchesServlet", urlPatterns = {"/commits"})
public class BranchesServlet extends HttpServlet {

}
