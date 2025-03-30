import AccountMenu from '../../AccountMenu';
import ConnectEmailForm from '../../ConnectEmailForm';

const SectionEmail = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-3-tablet is-2-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-9-tablet is-10-widescreen">
				<ConnectEmailForm />
			</div>
		</div>
	);
};

export default SectionEmail;
