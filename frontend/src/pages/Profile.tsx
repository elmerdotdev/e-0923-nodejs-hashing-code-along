type Props = {
  username: string
  onLogout: () => void;
}

const Profile = ({ username, onLogout }: Props) => {
  return (
    <div>
      <h1>{username}'s Profile</h1>
      <button onClick={() => onLogout()}>Log Out</button>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatum voluptate impedit ipsam velit neque ad error laborum totam tempore perspiciatis, eos cum, est aut et necessitatibus ut quas dolorem veritatis officia aperiam libero. Quidem provident, iure modi nobis numquam, voluptates fuga inventore eum beatae error esse atque animi placeat.</p>
    </div>
  )
}

export default Profile