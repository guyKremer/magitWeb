package users;

import com.google.gson.JsonObject;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;

public class PRMessage extends Message {
    enum Status {
        WAITING,
        CONFIRMED,
        DENIED
    }

    private String repositoryName;
    private String targetUserName;
    private String basisUserName;
    private String targetBranch;
    private String basisBranch;
    private String PRMsg;
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
        basisUserName = i_basisUserName;
        targetBranch = i_targetBranch;
        basisBranch = i_basisBranch;
        PRMsg = i_PRMsg;
        status = Status.WAITING;
    }

    public void setStatus(boolean bool){
        if(bool){
            status = Status.CONFIRMED;
        }else{
            status = Status.DENIED;
        }
    }

    @Override
    public JsonObject toJson(){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("type","PRMsg");
        jsonObject.addProperty("date",Date.toString());
        jsonObject.addProperty("repositoryName",repositoryName);
        jsonObject.addProperty("userName",userName);
        jsonObject.addProperty("targetBranch",targetBranch);
        jsonObject.addProperty("basisBranch",basisBranch);
        jsonObject.addProperty("PRMsg",PRMsg);

        return jsonObject;
    }
}
