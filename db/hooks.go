package db

import (
	"github.com/pocketbase/pocketbase"
)

func InitHooks(app *pocketbase.PocketBase) {
	//
	//app.OnModelBeforeUpdate().Add(func(e *core.ModelEvent) error {
	//	//
	//	//record := e.Model.(*models.Record)
	//	//
	//	//// can be used to create history
	//	////if !e.Model.IsNew() {
	//	////	cpDao := daos.New(app.Dao().DB())
	//	////	old := record.OriginalCopy()
	//	////	old.SetId("")
	//	////	old.MarkAsNew()
	//	////	err := cpDao.SaveRecord(old)
	//	////	if err != nil {
	//	////		return err
	//	////	}
	//	////}
	//	//
	//	//app.Cache().GetAll()
	//	//
	//	//println(fmt.Sprintf("updating model: %v, table:  %v", record, e.Model.TableName()))
	//
	//	return nil
	//})
	//
	//app.OnRecordBeforeUpdateRequest().Add(func(e *core.RecordUpdateEvent) error {
	//	//originalCopy := e.Record.OriginalCopy()
	//	//
	//	//// check if history table exists
	//	//historyTableName := e.Record.TableName() + "_history"
	//	//
	//	//if !app.Dao().HasTable(historyTableName) {
	//	//	println("history table doesn't exist")
	//	//}
	//	//
	//	//if !e.Record.IsNew() {
	//	//	originalCopy.MarkAsNew()
	//	//	originalCopy.SetId("")
	//	//}
	//
	//	return nil
	//})

}
