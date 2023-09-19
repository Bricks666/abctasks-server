CREATE EXTENSION intarray;
CREATE OR REPLACE FUNCTION insert_tagId_into_task_fucntion()
RETURNS TRIGGER as
$$
BEGIN
  UPDATE "Task" SET "tagIds" = "tagIds" + NEW."tagId"
  WHERE "id" = NEW."taskId" and "roomId" = NEW."roomId";

  RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE TRIGGER insert_tagId_into_task AFTER INSERT
ON "TagTask" FOR EACH ROW
EXECUTE PROCEDURE insert_tagId_into_task_fucntion();

CREATE OR REPLACE FUNCTION remove_tagId_into_task_fucntion()
RETURNS TRIGGER as
$$
BEGIN
  UPDATE "Task" SET "tagIds" = "tagIds" - OLD."tagId"
  WHERE "id" = OLD."taskId" AND "roomId" = OLD."roomId";

  RETURN OLD;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE TRIGGER remove_tagId_into_task AFTER DELETE
ON "TagTask" FOR EACH ROW
EXECUTE PROCEDURE remove_tagId_into_task_fucntion();

CREATE OR REPLACE FUNCTION update_tagId_into_task_fucntion()
RETURNS TRIGGER as
$$
BEGIN
  UPDATE "Task" SET "tagIds" = "tagIds" + NEW."tagId"
  WHERE "id" = NEW."taskId" and "roomId" = NEW."roomId";


  UPDATE "Task" SET "tagIds" = "tagIds" - OLD."tagId"
  WHERE "id" = OLD."taskId" AND "roomId" = OLD."roomId";

  RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE TRIGGER update_tagId_into_task AFTER UPDATE of "tagId", "taskId"
ON "TagTask" FOR EACH ROW
EXECUTE PROCEDURE update_tagId_into_task_fucntion();

CREATE OR REPLACE FUNCTION truncate_tagId_into_task_fucntion()
RETURNS TRIGGER as
$$
BEGIN
  UPDATE "task" SET "tagIds" = ARRAY[]::INTEGER[];

  RETURN NULL;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE TRIGGER truncate_tagId_into_task AFTER TRUNCATE
ON "TagTask" FOR EACH STATEMENT
EXECUTE PROCEDURE truncate_tagId_into_task_fucntion();
