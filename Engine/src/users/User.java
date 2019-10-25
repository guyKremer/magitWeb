package users;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String userName;
    List<Message> messages = new ArrayList<Message>();
    private boolean online;

    public User(String i_userName){
        userName = i_userName;
        Login();
    }

    public void AddMessage(Message i_msg){
        messages.add(i_msg);
    }

    public String getUserName() {
        return userName;
    }

    public void Login() {
        online = true;
    }

    public void Logout() {
        online = false;
    }
}
