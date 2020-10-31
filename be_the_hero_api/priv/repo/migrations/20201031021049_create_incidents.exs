defmodule BeTheHeroApi.Repo.Migrations.CreateIncidents do
  use Ecto.Migration

  def change do
    create table(:incidents, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :descrption, :text
      add :value, :float
      add :ong_id, references(:ongs, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:incidents, [:ong_id])
  end
end
