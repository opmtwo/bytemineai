const ContactAvatar = ({ url, width = 40, height = 40 }: { url?: string; width?: number; height?: number }) => {
	const src = url ? url : '/avatar.jpg';

	return (
		<figure className="image is-1by1" style={{ width, height }}>
			<img src={src} alt="" className="has-ratio is-rounded" />
		</figure>
	);
};

export default ContactAvatar;
