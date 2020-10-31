defmodule BeTheHeroApiWeb.OngControllerTest do
  use BeTheHeroApiWeb.ConnCase

  alias BeTheHeroApi.BeTheHero
  alias BeTheHeroApi.BeTheHero.Ong

  @create_attrs %{
    city: "some city",
    email: "some email",
    name: "some name",
    uf: "some uf",
    wpp: "some wpp"
  }
  @update_attrs %{
    city: "some updated city",
    email: "some updated email",
    name: "some updated name",
    uf: "some updated uf",
    wpp: "some updated wpp"
  }
  @invalid_attrs %{city: nil, email: nil, name: nil, uf: nil, wpp: nil}

  def fixture(:ong) do
    {:ok, ong} = BeTheHero.create_ong(@create_attrs)
    ong
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all ongs", %{conn: conn} do
      conn = get(conn, Routes.ong_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ong" do
    test "renders ong when data is valid", %{conn: conn} do
      conn = post(conn, Routes.ong_path(conn, :create), ong: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.ong_path(conn, :show, id))

      assert %{
               "id" => id,
               "city" => "some city",
               "email" => "some email",
               "name" => "some name",
               "uf" => "some uf",
               "wpp" => "some wpp"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.ong_path(conn, :create), ong: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ong" do
    setup [:create_ong]

    test "renders ong when data is valid", %{conn: conn, ong: %Ong{id: id} = ong} do
      conn = put(conn, Routes.ong_path(conn, :update, ong), ong: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.ong_path(conn, :show, id))

      assert %{
               "id" => id,
               "city" => "some updated city",
               "email" => "some updated email",
               "name" => "some updated name",
               "uf" => "some updated uf",
               "wpp" => "some updated wpp"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, ong: ong} do
      conn = put(conn, Routes.ong_path(conn, :update, ong), ong: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ong" do
    setup [:create_ong]

    test "deletes chosen ong", %{conn: conn, ong: ong} do
      conn = delete(conn, Routes.ong_path(conn, :delete, ong))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.ong_path(conn, :show, ong))
      end
    end
  end

  defp create_ong(_) do
    ong = fixture(:ong)
    %{ong: ong}
  end
end
