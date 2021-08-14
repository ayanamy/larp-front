import React, { FC, useState, useEffect } from 'react';
import { connect,IGamerState } from 'umi';
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
