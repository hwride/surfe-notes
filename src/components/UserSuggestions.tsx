import { User } from "../types/User.ts";

export function UserSuggestions({
  users,
  searchString,
}: {
  users: User[];
  searchString?: string;
}) {
  let suggestedUsers: User[];
  if (searchString) {
    suggestedUsers = users
      .filter((user) => user.username.toLowerCase().startsWith(searchString))
      .slice(0, 5);
  } else {
    suggestedUsers = users.slice(0, 5);
  }

  return (
    <div className="fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 border-1 border-gray-300 rounded bg-white opacity-90">
      {suggestedUsers.length > 0 ? (
        <div className="flex flex-col">
          <strong className="bg-gray-300 text-center p-2 font-normal">
            Matching users
          </strong>
          <ol className="p-2">
            {suggestedUsers.map((user) => (
              <li key={user.username}>{user.username}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="p-2">No users found</div>
      )}
    </div>
  );
}
