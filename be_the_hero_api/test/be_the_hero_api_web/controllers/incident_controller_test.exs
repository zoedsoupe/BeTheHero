defmodule BeTheHeroApiWeb.IncidentControllerTest do
  use BeTheHeroApiWeb.ConnCase

  alias BeTheHeroApi.BeTheHero
  alias BeTheHeroApi.BeTheHero.Incident

  @create_attrs %{
    descrption: "some descrption",
    title: "some title",
    value: 120.5
  }
  @update_attrs %{
    descrption: "some updated descrption",
    title: "some updated title",
    value: 456.7
  }
  @invalid_attrs %{descrption: nil, title: nil, value: nil}

  def fixture(:incident) do
    {:ok, incident} = BeTheHero.create_incident(@create_attrs)
    incident
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all incidents", %{conn: conn} do
      conn = get(conn, Routes.incident_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create incident" do
    test "renders incident when data is valid", %{conn: conn} do
      conn = post(conn, Routes.incident_path(conn, :create), incident: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.incident_path(conn, :show, id))

      assert %{
               "id" => id,
               "descrption" => "some descrption",
               "title" => "some title",
               "value" => 120.5
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.incident_path(conn, :create), incident: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update incident" do
    setup [:create_incident]

    test "renders incident when data is valid", %{conn: conn, incident: %Incident{id: id} = incident} do
      conn = put(conn, Routes.incident_path(conn, :update, incident), incident: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.incident_path(conn, :show, id))

      assert %{
               "id" => id,
               "descrption" => "some updated descrption",
               "title" => "some updated title",
               "value" => 456.7
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, incident: incident} do
      conn = put(conn, Routes.incident_path(conn, :update, incident), incident: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete incident" do
    setup [:create_incident]

    test "deletes chosen incident", %{conn: conn, incident: incident} do
      conn = delete(conn, Routes.incident_path(conn, :delete, incident))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.incident_path(conn, :show, incident))
      end
    end
  end

  defp create_incident(_) do
    incident = fixture(:incident)
    %{incident: incident}
  end
end
