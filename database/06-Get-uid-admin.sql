create or replace function fn_obtener_admin_id_por_uid(
  p_id_usuario_supabase UUID
)
returns table(
  adminid int,
  msj_tipo text,
  msj_texto text
)
as $$
begin
  if p_id_usuario_supabase is null then
    return query select null::int, 'warning', 'El ID del usuario es requerido.';
    return;
  end if;

  if exists(select 1 from t_admins t where t.id_usuario_supabase = p_id_usuario_supabase) then
    return query
      select t.adminid, 'success', 'AdminID encontrado correctamente.'
      from t_admins t
      where t.id_usuario_supabase = p_id_usuario_supabase
      limit 1;
  else
    return query
      select null::int, 'warning', 'No se encontró ningún administrador con ese ID de usuario.';
  end if;

  exception when others then
    return query
    select null::int, 'error', 'Error inesperado: ' || SQLERRM;
end;
$$ language plpgsql;

