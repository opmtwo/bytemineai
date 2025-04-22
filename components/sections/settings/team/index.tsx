import CrudProvider from '../../../../providers/crud-provider';
import awsmobile from '../../../../src/aws-exports';
import AccountMenu from '../../../AccountMenu';
import SectionMyTeam from '../../my-team/SectionMyTeam';

const SectionSettingsTeam = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-4-tablet is-3-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-8-tablet is-9-widescreen">
                <CrudProvider baseApi={awsmobile.aws_cloud_logic_custom[0].name} baseUrl="api/v1/users" searchKeys={['name', 'slug', 'role']} baseSortMap={[]}>
					<SectionMyTeam />
				</CrudProvider>
			</div>
		</div>
	);
};

export default SectionSettingsTeam;
