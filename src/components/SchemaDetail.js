import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const SchemaDetail = ({ schemaTitle }) => {
  const [schemaFields, setSchemaFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [allData, setAllData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [jsonSchema, setJsonSchema] = useState(null);
  const [uiSchema, setUiSchema] = useState({});


  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const base64Credentials = btoa(`${username}:${password}`);
  const apiUrl = `http://localhost:8080/${schemaTitle}`;

  // Fetch data from the backend
  useEffect(() => {
    fetchAllData();
    fetchSchema();
  }, [schemaTitle]);

  // GET all data
  const fetchAllData = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAllData(data);

        // Automatically infer fields from first object
        if (data.length > 0) {
          const fieldNames = Object.keys(data[0]).filter(
            (key) => key !== "_id" && key !== "id"
          );
          const fields = fieldNames.map((name) => ({
            name,
            type: typeof data[0][name] === "number" ? "number" : "text",
          }));
          setSchemaFields(fields);
        }
      } else {
        alert("Access denied or login expired");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchSchema = async () => {
  try {
    const res = await fetch(`http://localhost:8080/schemas/${schemaTitle}`, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    const schemaData = await res.json();
    setJsonSchema(schemaData);
    console.log(schemaData);
    
    setUiSchema(generateUISchema(schemaData)); // Optional
  } catch (err) {
    console.error("Schema fetch failed", err);
  }
};

function generateUISchema(schema) {
  const elements = Object.keys(schema.properties).map((key) => ({
    type: "Control",
    scope: `#/properties/${key}`
  }));

  return {
    type: "VerticalLayout",
    elements
  };
}


  // POST new data
  const handleCreate = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credentials}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({});
        setShowForm(false);
        fetchAllData();
      } else {
        alert("Failed to create data");
      }
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  // DELETE data
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });

      if (res.ok) {
        fetchAllData();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔁 Generate columns from schema fields
  const columns = schemaFields.map((field) => ({
    field: field.name,
    headerName: field.name,
    flex: 1,
  }));

  // ➕ Add Actions column
  columns.push({
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => (
      <div className="flex gap-2">
        <button
          onClick={() => alert("Edit coming soon")}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(params.row.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    ),
    sortable: false,
    width: 180,
  });

  // 🧾 DataGrid rows
  const rows = allData.map((item, index) => ({
    id: item.id || index,
    ...item,
  }));

  return (
    <div className="flex">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{schemaTitle} Data</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create"}
          </button>
        </div>

<Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
  <DialogTitle>New Entry</DialogTitle>
  <DialogContent>
    {jsonSchema && (
      <JsonForms
        schema={jsonSchema}
        uischema={uiSchema}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />
    )}
  </DialogContent>
  <DialogActions>
    <button
      onClick={handleCreate}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Submit
    </button>
    <button
      onClick={() => setShowForm(false)}
      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
    >
      Cancel
    </button>
  </DialogActions>
</Dialog>


        {/* 🔳 DataGrid */}
        <div className="bg-white shadow rounded" style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7, 10, 20]}
          />
        </div>
      </div>
    </div>
  );
};

export default SchemaDetail;
