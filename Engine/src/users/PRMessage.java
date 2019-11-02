package users;

import com.google.gson.JsonObject;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;

public class PRMessage extends Message {
    public enum Status {
        WAITING,
        CONFIRMED,
        DENIED
    }

    private String repositoryName;
    private String creatorUserName;
    private String targetUserName;
    private String targetBranch;
    private String baseBranch;
    private String PRMsg;

    public void setStatus(Status status) {
        this.status = status;
    }

    private PRMessage.Status status;

    public PRMessage(
            String i_repoName,
            String i_targetUserName,
            String i_basisUserName,
            String i_targetBranch,
            String i_basisBranch,
            String i_PRMsg){
        repositoryName = i_repoName;
        targetUserName = i_targetUserName;
        creatorUserName = i_basisUserName;
        targetBranch = i_targetBranch;
        baseBranch = i_basisBranch;
        PRMsg = i_PRMsg;
        status = Status.WAITING;
    }

    public PRMessage(
            String i_repoName,
            String i_targetUserName,
            String i_basisUserName,
            String i_targetBranch,
            String i_basisBranch,
            String i_PRMsg,
            Status i_status){
        repositoryName = i_repoName;
        targetUserName = i_targetUserName;
        creatorUserName = i_basisUserName;
        targetBranch = i_targetBranch;
        baseBranch = i_basisBranch;
        PRMsg = i_PRMsg;
        status = i_status;
    }

    public void setStatus(boolean bool){
        if(bool){
            this.status = Status.CONFIRMED;
        }else{
            this.status = Status.DENIED;
        }
    }

    @Override
    public JsonObject toJson(){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("type","PRMsg");
        jsonObject.addProperty("date",Date.toString());
        jsonObject.addProperty("repositoryName",repositoryName);
        jsonObject.addProperty("targetUserName",targetUserName);
        jsonObject.addProperty("creatorUserName",creatorUserName);
        jsonObject.addProperty("targetBranch",targetBranch);
        jsonObject.addProperty("baseBranch",baseBranch);
        jsonObject.addProperty("PRMsg",PRMsg);
        jsonObject.addProperty("status",status.toString());

        return jsonObject;
    }
}
