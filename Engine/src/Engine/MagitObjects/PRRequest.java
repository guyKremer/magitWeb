package Engine.MagitObjects;

import users.PRMessage;

public class PRRequest {
    private String targetBranch;
    private String basisBranch;
    private String userCreator;
    private String date;
    private PRMessage.Status status;

    public PRRequest(String targetBranch, String basisBranch, String userCreator, String date, PRMessage.Status status) {
        this.targetBranch = targetBranch;
        this.basisBranch = basisBranch;
        this.userCreator = userCreator;
        this.date = date;
        this.status = status;
    }

    public String getTargetBranch() {
        return targetBranch;
    }

    public void setTargetBranch(String targetBranch) {
        this.targetBranch = targetBranch;
    }

    public String getBasisBranch() {
        return basisBranch;
    }

    public void setBasisBranch(String basisBranch) {
        this.basisBranch = basisBranch;
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

    public PRMessage.Status getStatus() {
        return status;
    }

    public void setStatus(PRMessage.Status status) {
        this.status = status;
    }

}
