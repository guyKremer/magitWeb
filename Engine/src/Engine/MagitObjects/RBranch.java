package Engine.MagitObjects;

import java.nio.file.Path;

public class RBranch extends Branch {
    public RBranch(Path i_pathToBranch, String i_name, String i_commitSha1,Path repoPath)throws java.io.IOException {
        super(i_pathToBranch,i_name, i_commitSha1,repoPath);
    }
}
