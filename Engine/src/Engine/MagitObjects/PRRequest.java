package Engine.MagitObjects;

import com.google.gson.JsonObject;
import users.PRMessage;

import java.util.List;
import java.util.Map;

public class PRRequest {
    private String targetBranch;
    private String baseBranch;
    private String userCreator;
    private String date;
    private Map<String, List<Changes>> prData;
    private String msg;
    private PRMessage.Status status;



    public PRRequest(String targetBranch, String baseBranch, String userCreator, String date, Map<String, List<Changes>> prData, String msg) {
        this.targetBranch = targetBranch;
        this.baseBranch = baseBranch;
        this.userCreator = userCreator;
        this.date = date;
        this.prData = prData;
        this.msg = msg;
        status = PRMessage.Status.WAITING;
    }

    public String getTargetBranch() {
        return targetBranch;
    }

    public void setTargetBranch(String targetBranch) {
        this.targetBranch = targetBranch;
    }

    public String getBaseBranch() {
        return baseBranch;
    }

    public String getMsg() {
        return msg;
    }

    public void setBaseBranch(String baseBranch) {
        this.baseBranch = baseBranch;
    }

    public String getUserCreator() {
        return userCreator;
    }

    public void setUserCreator(String userCreator) {
        this.userCreator = userCreator;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Map<String, List<Changes>> getPrData() {
        return prData;
    }

    public void setPrData(Map<String, List<Changes>> prData) {
        this.prData = prData;
    }


    public JsonObject toJson(){

        JsonObject jsonObject = new JsonObject();

        jsonObject.addProperty("date",date);
        jsonObject.addProperty("userCreator",userCreator);
        jsonObject.addProperty("targetBranch",targetBranch);
        jsonObject.addProperty("baseBranch",baseBranch);
        jsonObject.addProperty("msg",msg);
        jsonObject.addProperty("status",status.toString());
        return jsonObject;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setStatus(PRMessage.Status status) {
        this.status = status;
    }
}
