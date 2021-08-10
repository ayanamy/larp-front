import React, { FC, useState, useEffect } from 'react';
import { connect } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import RolesList from '@/components/RolesList';
type TRolesControl = Pick<GamerState, 'rolesList'>;
const connector = ({ gamer }: { gamer: GamerState }) => {
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
