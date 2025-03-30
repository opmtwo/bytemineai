import Loader from './Loader';

const LoaderFullscreen = ({ opacity = 0.75 }: { opacity?: number }) => {
	return (
		<div
			className="is-overlay is-flex is-align-items-center is-justify-content-center"
			style={{ zIndex: 100, position: 'fixed' }}
		>
			<div className="is-overlay has-background-white" style={{ opacity }}></div>
			<Loader style={{ zIndex: 1 }} />
		</div>
	);
};

export default LoaderFullscreen;
