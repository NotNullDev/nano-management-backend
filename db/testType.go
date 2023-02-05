package db

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

var _ models.Model = (*Hello)(nil)

type Hello struct {
	models.BaseModel

	HelloString string         `json:"helloString" db:"hello_string"`
	HelloInt    int            `json:"helloInt" db:"hello_int"`
	HelloDate   types.DateTime `json:"helloDate" db:"hello_date"`
}

func (h Hello) TableName() string {
	return "hello"
}

func CreateHelloCollection(app pocketbase.PocketBase) error {
	collection := &models.Collection{}

	form := forms.NewCollectionUpsert(app, collection)
	form.Name = "example"
	form.Type = models.CollectionTypeBase
	form.ListRule = nil
	form.ViewRule = types.Pointer("@request.auth.id != ''")
	form.CreateRule = types.Pointer("")
	form.UpdateRule = types.Pointer("@request.auth.id != ''")
	form.DeleteRule = nil
	form.Schema.AddField(&schema.SchemaField{
		Name:     "title",
		Type:     schema.FieldTypeText,
		Required: true,
		Unique:   true,
		Options: &schema.TextOptions{
			Max: types.Pointer(10),
		},
	})
	form.Schema.AddField(&schema.SchemaField{
		Name:     "user",
		Type:     schema.FieldTypeRelation,
		Required: true,
		Options: &schema.RelationOptions{
			MaxSelect:     types.Pointer(1),
			CollectionId:  "ae40239d2bc4477",
			CascadeDelete: true,
		},
	})

	// validate and submit (internally it calls app.Dao().SaveCollection(collection) in a transaction)
	if err := form.Submit(); err != nil {
		return err
	}
	return nil
}
