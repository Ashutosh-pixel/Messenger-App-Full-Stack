import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import useUsers from "../hooks/useUsers";
import Notification from "../components/notification/Notification";

const Home = () => {
  const { users, error, loading } = useUsers();

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90">
      {loading ? (
        <h1 className="text-white">loading</h1>
      ) : (
        <>
          <Sidebar />
          <MessageContainer />
          <Notification />
        </>
      )}
    </div>
  );
};

export default Home;
