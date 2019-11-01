package users;

import com.google.gson.JsonObject;

public class ForkMessage extends Message{
    private String repositoryName;
    private String userName;

    public void SetRepositoryName(String i_repoName){
        repositoryName = i_repoName;
    }

    public void SetUserName(String i_userName){
        userName = i_userName;
    }

    public ForkMessage(String i_repoName, String i_userName){
        SetRepositoryName(i_repoName);
        SetUserName(i_userName);
    }

    @Override
    public JsonObject toJson(){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("type","forkMsg");
        jsonObject.addProperty("date",Date.toString());
        jsonObject.addProperty("repositoryName",repositoryName);
        jsonObject.addProperty("userName",userName);

        return jsonObject;
    }
}
