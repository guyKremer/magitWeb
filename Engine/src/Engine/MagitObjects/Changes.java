package Engine.MagitObjects;

import com.google.gson.JsonObject;

public class Changes {
    String commitSha1;
    String status;
    String content;

    public Changes(String commitSha1, String status) {
        this.commitSha1 = commitSha1;
        this.status = status;
    }

    public String getCommitSha1() {
        return commitSha1;
    }

    public void setCommitSha1(String commitSha1) {
        this.commitSha1 = commitSha1;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public JsonObject toJson(){

        JsonObject jsonObject = new JsonObject();

        jsonObject.addProperty("commitSha1",commitSha1);
        jsonObject.addProperty("status",status);
        jsonObject.addProperty("content",content);

        return jsonObject;
    }

}
