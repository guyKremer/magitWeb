package servlets;

import Engine.MagitObjects.FolderItems.Blob;
import Engine.MagitObjects.FolderItems.Folder;
import Engine.MagitObjects.FolderItems.FolderItem;
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
import java.util.List;

import static constants.Constants.*;

@WebServlet(name = "FolderItemServlet", urlPatterns = {"/folderItem"})
public class FolderItemServlet  extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userNameFromParameter = SessionUtils.getUsername(request);
        String folderItemName =request.getParameter(FOLDERITEM);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        Folder rootFolder = userManager.usersMap.get(userNameFromParameter).getRootFolder();
        JsonObject jsonObject;
        JsonArray jsonArray = new JsonArray();
        FolderItem res;

        if(folderItemName.equals(rootFolder.GetName())){ // if root requested
            for(FolderItem folderItem : rootFolder.GetItems()) {
                jsonArray.add(new FolderItemDetails(folderItem.GetName(), folderItem.GetType(), null, null).toJson());
            }
                jsonObject = (new FolderItemDetails(rootFolder.GetName(),rootFolder.GetType(), jsonArray, null)).toJson();
        }else{
            res = getItem(rootFolder, folderItemName);
            if(res.GetType().equals("folder")){
                for(FolderItem item : ((Folder)res).GetItems()){
                    jsonArray.add(new FolderItemDetails(item.GetName(), item.GetType(), null, null).toJson());
                }
                jsonObject = (new FolderItemDetails(rootFolder.GetName(),rootFolder.GetType(), jsonArray, null)).toJson();
            }else{
                jsonObject = (new FolderItemDetails(res.GetName(),res.GetType(),null, ((Blob)res).GetContent())).toJson();
            }
        }

        ServletUtils.SendJsonResponse(response, jsonObject);
    }

    public FolderItem getItem(Folder rootFolder, String itemName){
        FolderItem res = null;
        for(FolderItem item : rootFolder.GetItems()){
            if(item.GetName().equals(itemName)){
                res = item;
                break;
            }
            else if(item.GetType().equals("folder")) {
                res = getItem((Folder)item, itemName);
            }
        }
        return res;
    }

    public class FolderItemDetails{
        private String name;
        private String type;
        private JsonArray folderContent;
        private String content;

        public FolderItemDetails(String name, String type, JsonArray folderContent, String content) {
            this.name = name;
            this.type = type;
            this.folderContent = folderContent;
            this.content = content;
        }

        public JsonObject toJson(){
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("name",name);
            jsonObject.addProperty("type",type);
            if(folderContent != null) {
                jsonObject.add("content", folderContent);
            }else {
                jsonObject.addProperty("content", content);
            }

            return jsonObject;
        }
    }
}
