package users;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String userName;
    List<Message> messages = new ArrayList<Message>();

    public void AddMessage(Message i_msg){
        messages.add(i_msg);
    }
}
