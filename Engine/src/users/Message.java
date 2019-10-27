package users;


import com.google.gson.JsonObject;
import java.text.SimpleDateFormat;

 public abstract class Message {
    protected SimpleDateFormat Date =  new SimpleDateFormat("dd.MM.yyyy-hh:mm:ss:SSS");
    protected boolean opened = false;

      public abstract JsonObject toJson();
}
