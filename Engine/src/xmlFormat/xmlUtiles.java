package xmlFormat;

import Engine.Engine;
import Engine.MagitObjects.*;
import Engine.MagitObjects.FolderItems.Blob;
import Engine.MagitObjects.FolderItems.Folder;
import Engine.MagitObjects.FolderItems.FolderItem;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class xmlUtiles {
    private static Repository m_repository;
    private static MagitRepository m_mr;
    private static List<MagitSingleFolder> m_msfList;
    private static List<MagitBlob> m_mbList;
    private static List<MagitSingleCommit> m_mscList;
    private static List<MagitSingleBranch> m_msbList;
    private static Set<String> m_foldersIds;
    private static Set<String> m_blobsIds;
    private static Set<String> m_commitsIds;
    private static final String rootPath = "c:\\magit-ex3";

    private static MagitRepository parseFromXmlFileToXmlMagitRepository(String i_XMLContent) throws JAXBException, FileNotFoundException, XmlValidatorException {
        try {
            InputStream inputStream = new ByteArrayInputStream(i_XMLContent.getBytes());
            JAXBContext jc = JAXBContext.newInstance(MagitRepository.class);
            Unmarshaller u = jc.createUnmarshaller();

            return (MagitRepository) u.unmarshal(inputStream);

        }catch(Exception e){
            throw new XmlValidatorException("Not Valid XML file");
        }

    }


    public static Repository LoadXmlEx3(String i_XMLContent, String i_UserName,Path repoPath) throws Exception {

        m_mr = parseFromXmlFileToXmlMagitRepository(i_XMLContent);
        loadRepositoryListsObjects();
        loadSetIds();

        checkXMLvalidation();

        parseRepository(i_UserName,repoPath);

        return m_repository;
    }

    /*
    public static Repository LoadXml(String i_path) throws Exception {

        String extension = getFileExtension(i_path);

        if (!extension.toLowerCase().equals(".xml")) {
            throw new XmlValidatorException("Is not XML file");
        }
        Path XMLpath = Paths.get(i_path);
        if (!XMLpath.toFile().exists()) {
            throw new XmlValidatorException("File not exists");
        }
        m_mr = loadRepository(XMLpath);
        loadRepositoryListsObjects();
        loadSetIds();

        checkXMLvalidation();

        parseRepository();

        return m_repository;
    }
     */

    public static void ExportToXml(Repository i_repository, String i_path) throws IOException, JAXBException {
        m_msfList = new ArrayList<MagitSingleFolder>();
        m_mbList = new ArrayList<MagitBlob>();
        m_mscList = new ArrayList<MagitSingleCommit>();
        m_msbList = new ArrayList<MagitSingleBranch>();

        m_repository = i_repository;
        m_mr = new MagitRepository();
        m_mr.setMagitBranches(new MagitBranches());
        m_mr.setLocation(m_repository.GetRepositoryPath().toString());
        m_mr.setName(m_repository.GetRepositoryPath().getFileName().toString());

        //createMagitRepository();
        createXmlFile(i_path);
    }

    private static void createXmlFile(String i_path) throws JAXBException {
        File file = new File(i_path);
        JAXBContext jaxbContext = JAXBContext.newInstance(MagitRepository.class);
        Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

        jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        jaxbMarshaller.marshal(m_mr, file);
    }

    private static void folderToMagitSingFolder(Folder i_folder, boolean i_isRootFolder) {
        MagitSingleFolder msf = new MagitSingleFolder();
        MagitSingleFolder.Items folderItems = new MagitSingleFolder.Items();
        Item folderItem;

        msf.setId(i_folder.getSha1());
        if(!i_isRootFolder) {
            msf.setName(i_folder.getPath().getFileName().toString());
        }
        msf.setIsRoot(i_isRootFolder);
        msf.setLastUpdateDate(i_folder.GetLastModified());
        msf.setLastUpdater(i_folder.GetUpdater());

        for(FolderItem item : i_folder.GetItems()){
            folderItem = new Item();
            folderItem.setId(item.getSha1());
            folderItems.getItem().add(folderItem);
            if(item.GetType().equals("file")){
                folderItem.setType("blob");
                blobToMagitBlob((Blob)item);
            }
            else{ //folder
                folderItem.setType(item.GetType());
                folderToMagitSingFolder((Folder)item,false);
            }
        }

        msf.setItems(folderItems);
        if(findById(msf.getId(),m_msfList) == null) {
            m_msfList.add(msf);
        }
    }

    private static void blobToMagitBlob(Blob i_blob) {
        MagitBlob mb = new MagitBlob();

        mb.setId(i_blob.getSha1());
        mb.setName(i_blob.GetName());
        mb.setLastUpdater(i_blob.GetUpdater());
        mb.setLastUpdateDate(i_blob.GetLastModified());
        mb.setContent(i_blob.GetContent());

        if(findById(mb.getId(),m_mbList) == null) {
            m_mbList.add(mb);
        }
    }

    private static void loadRepositoryListsObjects() {
        m_msfList = m_mr.getMagitFolders().getMagitSingleFolder();
        m_mbList = m_mr.getMagitBlobs().getMagitBlob();
        m_mscList = m_mr.getMagitCommits().getMagitSingleCommit();
        m_msbList = m_mr.getMagitBranches().getMagitSingleBranch();
    }

    private static String getFileExtension(String i_path) throws XmlValidatorException {
        String extension;
        int extensionIndex = i_path.lastIndexOf(".");

        if(extensionIndex != -1) {
            extension = i_path.substring(extensionIndex);
        }
        else{
            throw new XmlValidatorException("Is not XML file");
        }

        return extension;
    }

    private static MagitRepository loadRepository(Path i_XMLpath) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(MagitRepository.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        return (MagitRepository) unmarshaller.unmarshal(i_XMLpath.toFile());
    }

    private static boolean checkXMLvalidation() throws XmlValidatorException {

        checkUniqueIDs();
        checkFolderIdsPointers();
        checkCommitIdsPointers();
        checkBranchIdsPointers();
        checkHeadBranch();

        return true;
    }

    private static boolean checkFolderIdsPointers() throws XmlValidatorException {
        Set<String> itemsIds;

        for (MagitSingleFolder msf : m_msfList) {
            for (Item item : msf.getItems().getItem()) {
                if (item.getId().equals(msf.getId()) && item.getType().toLowerCase().equals("folder")) {
                    throw new XmlValidatorException("Folder points to his own ID");
                }
                if (!(item.getType().toLowerCase().equals("blob") && m_blobsIds.contains(item.getId())
                        || item.getType().toLowerCase().equals("folder") && m_foldersIds.contains(item.getId()))) {
                    throw new XmlValidatorException("Folder points to file or blob that does not exists");
                }
            }
        }


        return true;
    }

    private static boolean checkCommitIdsPointers() throws XmlValidatorException {
        String folderId;

        for (MagitSingleCommit msc : m_mscList) {
            folderId = msc.getRootFolder().getId();
            if (!(m_foldersIds.contains(folderId))) {
                throw new XmlValidatorException("Commit points to Folder that does not exists");
            }
            for (MagitSingleFolder msf : m_msfList) {
                if (msf.getId().equals(folderId) && !msf.isIsRoot()) {
                    throw new XmlValidatorException("Commit points to a non-root folder");
                }
            }
        }

        return true;
    }

    private static boolean checkBranchIdsPointers() throws XmlValidatorException {

        for (MagitSingleBranch msb : m_msbList) {
            if (!m_commitsIds.contains(msb.getPointedCommit().getId())) {
                throw new XmlValidatorException("Branch points to Commit that does not exists");
            }
        }

        return true;
    }

    private static boolean checkHeadBranch() throws XmlValidatorException {
        boolean isHeadExists = false;

        for (MagitSingleBranch msb : m_msbList) {
            if (m_mr.getMagitBranches().getHead().equals(msb.getName())) {
                isHeadExists = true;
                break;
            }
        }

        if (!isHeadExists) {
            throw new XmlValidatorException("Head Branch does not exists");
        }

        return true;
    }

    private static void loadSetIds() {
        m_blobsIds = getIdsSet(m_mbList);
        m_foldersIds = getIdsSet(m_msfList);
        m_commitsIds = getIdsSet(m_mscList);
    }

    private static boolean checkUniqueIDs() throws XmlValidatorException {

        if (m_blobsIds.size() != m_mbList.size()) {
            throw new XmlValidatorException(uniqueErrMsg("Blobs"));
        }
        if (m_foldersIds.size() != m_msfList.size()) {
            throw new XmlValidatorException(uniqueErrMsg("Folders"));
        }
        if (m_commitsIds.size() != m_mscList.size()) {
            throw new XmlValidatorException(uniqueErrMsg("Commits"));
        }

        return true;
    }

    private static <T> Set<String> getIdsSet(List<T> i_magitList) {

        Set<String> ids = new HashSet<>();
        Method method;

        for (T item : i_magitList) {
            try {
                method = item.getClass().getMethod("getId");
                ids.add((String) method.invoke(item));
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }

        return ids;
    }

    private static String uniqueErrMsg(String magitObj) {

        return "There is 2 or more " + magitObj + " with the same ID";
    }

    private static Repository parseRepository(String i_UserName,Path repoPath) throws Exception {

        String userFolderLocation = rootPath + File.separator + i_UserName + File.separator;

        /*
        if(Files.exists(Paths.get(m_mr.getLocation()))){
            throw new FileAlreadyExistsException("Folder with the same name already exists");
        }
         */

        doesAllTrackingBranchesTrackAfterRemoteBranchThatIsRemote();

        // location --> rootPath (c:\magit-ex3) + userName + repoName

        if(m_mr.magitRemoteReference == null || m_mr.magitRemoteReference.location == null || m_mr.magitRemoteReference.name == null) {
            m_repository = new Repository(m_mr.getName(), userFolderLocation + m_mr.getName(), false);
        }
        else{
            m_repository = new LocalRepository(m_mr.getName(), userFolderLocation + m_mr.getName(), false,
                    m_mr.magitRemoteReference.location,
                    m_mr.magitRemoteReference.name);
            //((LocalRepository) m_repository).setRemoteRepoLocation(m_mr.magitRemoteReference.location);
            //((LocalRepository) m_repository).setRemoteRepoName(m_mr.magitRemoteReference.name);
        }

        Map<String, String> commitIdSha1 = new HashMap<String, String>(m_mscList.size());

        createAllCommits(commitIdSha1,Paths.get(repoPath + File.separator + m_mr.getName()));
        createAllBranches(commitIdSha1,Paths.get(repoPath + File.separator + m_mr.getName()));
        m_repository.loadCommitFromBranch(m_repository.GetHeadBranch());
        m_repository.SetCommitFromBranch(m_repository.GetHeadBranch(),true);
        return m_repository;
    }

    private static void doesAllTrackingBranchesTrackAfterRemoteBranchThatIsRemote() throws Exception
    {
        List<MagitSingleBranch> magitSingleBranches = m_mr.magitBranches.getMagitSingleBranch();

        for (MagitSingleBranch magitSingleBranch : magitSingleBranches)
        {
            if (magitSingleBranch.tracking != null)
            {
                if (branchTrackingAfterIsNotRemote(magitSingleBranch, magitSingleBranches))
                    throw new Exception("Branch " + magitSingleBranch.name + " tracking after branch that is not remote");
            }
        }
    }

    private static boolean branchTrackingAfterIsNotRemote(MagitSingleBranch magitSingleBranchTracking,
                                                   List<MagitSingleBranch> magitSingleBranches)
    {
        String trackingAfterName = magitSingleBranchTracking.trackingAfter;

        return magitSingleBranches
                .stream()
                .filter(magitSingleBranch -> magitSingleBranch.name.equals(trackingAfterName))
                .anyMatch(magitSingleBranch -> magitSingleBranch.isRemote == null);
    }



    private static void createAllCommits(Map<String, String> i_commitIdSha1,Path repoPath) throws IOException {
        for (MagitSingleCommit msc : m_mscList) {
            if (!i_commitIdSha1.containsKey(msc.getId())) {
                createCommitRec(msc, i_commitIdSha1,repoPath);
            }
        }
    }

    private static void createAllBranches(Map<String, String> i_commitIdSha1,Path repoPath) throws IOException {
        String currCommitSha1;
        Branch currBranch;

        for (MagitSingleBranch msb : m_msbList) {
            currCommitSha1 = i_commitIdSha1.get(msb.getPointedCommit().getId());
            if(msb.isRemote != null && msb.isRemote == true) {
                currBranch = new RBranch(
                        repoPath.resolve(".magit").resolve("branches").resolve(msb.getName()),
                        msb.getName(),
                        currCommitSha1,
                        repoPath
                );
            }
            else if(msb.tracking != null && msb.tracking == true){
                currBranch = new RTBranch(
                        repoPath.resolve(".magit").resolve("branches").resolve(msb.getName()),
                        currCommitSha1,
                        repoPath
                );
            }
            else{
                currBranch = new Branch(
                        repoPath.resolve(".magit").resolve("branches").resolve(msb.getName()),
                        currCommitSha1,
                        repoPath
                );
            }
            m_repository.InsertBranch(currBranch);
            if (msb.getName().equals(m_mr.getMagitBranches().getHead())){
                m_repository.SetHeadBranch(currBranch);
            }
        }
        m_repository.flushBranches();
    }

    private static void createCommitRec(MagitSingleCommit i_msc, Map<String, String> i_map,Path repoPath) throws IOException {
        String secondCommitId = "", firstCommitId = "";
        if (i_msc.getPrecedingCommits() != null && i_msc.getPrecedingCommits().getPrecedingCommit().size() != 0) {
            firstCommitId = i_msc.getPrecedingCommits().getPrecedingCommit().get(0).getId();

            if(i_msc.getPrecedingCommits().getPrecedingCommit().size() == 2){
                secondCommitId = i_msc.getPrecedingCommits().getPrecedingCommit().get(1).getId();
            }

            if (!i_map.containsKey(firstCommitId)) {
                createCommitRec(findById(firstCommitId, m_mscList), i_map,repoPath);
            }
            if(secondCommitId != "" && !i_map.containsKey(secondCommitId)){
                createCommitRec(findById(secondCommitId, m_mscList), i_map,repoPath);
            }
            i_map.put(i_msc.getId(), parseCommit(i_msc, i_map.get(firstCommitId), i_map.get(secondCommitId),repoPath).getSha1());

        }
        else {
            i_map.put(i_msc.getId(), parseCommit(i_msc, "","",repoPath).getSha1());
        }
    }

    private static Commit parseCommit(MagitSingleCommit i_msc,
                                      String i_firstCommitSha1,
                                      String i_secondCommitSha1,Path repoPath) throws IOException {
        Commit commit;
        MagitSingleFolder folder = null;
        String id;
        id = i_msc.getRootFolder().getId();

        folder = findById(id, m_msfList);

        commit = new Commit(i_msc.getMessage(),
                parseFolder(folder,
                        m_mr.getLocation(),repoPath),
                i_firstCommitSha1,
                i_secondCommitSha1,
                i_msc.getDateOfCreation(),
                i_msc.getAuthor(),repoPath);
        //commit.setSecondPrecedingSha1(i_secondCommitSha1);
        commit.getRootFolder().saveInObjects();

        Engine.Utils.zipToFile(repoPath.resolve(".magit").resolve("objects").resolve(commit.getSha1())
                , commit.toString(),repoPath);

        return commit;
    }

    private static Folder parseFolder(MagitSingleFolder i_msf, String i_location,Path repoPath) {
        Folder folder = new Folder(Paths.get(i_location),repoPath);
        MagitBlob mb = null;
        Blob blob = null;
        MagitSingleFolder msf = null;

        for (Item item : i_msf.getItems().getItem()) {
            if (item.getType().toLowerCase().equals("blob")) {
                mb = findById(item.getId(), m_mbList);
                blob = new Blob(Paths.get(i_location).resolve(mb.getName()), mb.getContent(),repoPath);
                blob.SetUpdater(mb.getLastUpdater());
                blob.SetLastModified(mb.getLastUpdateDate());
                blob.createSha1();
                folder.InsertItem(blob);
            } else { // folder
                msf = findById(item.getId(), m_msfList);
                folder.InsertItem(parseFolder(msf, Paths.get(i_location).resolve(msf.getName()).toString(),repoPath));
            }
        }

        folder.SetUpdater(i_msf.getLastUpdater());
        folder.SetLastModified(i_msf.getLastUpdateDate());
        folder.createSha1();

        return folder;
    }

    private static <T> T findById(String i_id, List<T> i_itemList) {
        T item = null;
        Method method;

        for (T currItem : i_itemList) {
            try {
                method = currItem.getClass().getMethod("getId");
                if (i_id.equals((String) method.invoke(currItem))) {
                    item = currItem;
                    break;
                }
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }

        return item;
    }
}
