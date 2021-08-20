import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import type { IGamerState } from 'umi';
import { connect } from 'umi';
import RolesList from '@/components/RolesList';

type TRolesControl = Pick<IGamerState, 'rolesList'>;
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    rolesList: gamer.rolesList,
  };
};

const RolesControl: FC<TRolesControl> = ({ rolesList }) => {
  return (
    <div>
      <RolesList type="avatar" rolesList={rolesList} />
    </div>
  );
};

export default connect(connector)(RolesControl);
