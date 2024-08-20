
export function UserAvatar({ session }) {

  console.log(session);

  return (
    <div>
      <img
        className="rounded-full"
        src={
          session?.data?.user.image ?? "/default_profile.png"
        }
        width={50}
        height={50}
        alt="User Avatar"
      />
    </div>
  )
}
