package users;

public class PRMessage {
    enum Status {
        WAITING,
        CONFIRMED,
        DENIED
    }

    private String repositoryName;
    private String userName;
    private String targetBranch;
    private String basisBranch;
    private String PRMsg;
    private PRMessage.Status status;

    public PRMessage(String i_repoName, String i_userName, String i_targetBranch, String i_basisBranch, String i_PRMsg){
        repositoryName = i_repoName;
        userName = i_userName;
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
}
