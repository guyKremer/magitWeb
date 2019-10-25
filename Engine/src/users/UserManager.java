package users;

import java.util.*;

public class UserManager {
    public final Map<String,User> usersMap;

    public UserManager() { usersMap = new HashMap<>(); }

    public synchronized void addUser(String username) {
        User user = new User(username);
        usersMap.put(username,user);
    }

    public synchronized void logoutUser(String username) {
        usersMap.get(username).Logout();
    }

    public synchronized Set<String> getUsers() {
        return usersMap.keySet();
    }

    public boolean isUserExists(String username) {
        if(usersMap.get(username) == null){
            return false;
        }
        return true;
    }
}
