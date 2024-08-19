
export function UserAvatar({ session }) {


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
