with Ada.Text_IO;
use Ada.Text_IO;
with Ada.Integer_Text_IO;
use Ada.Integer_Text_IO;
procedure producer_consumer_system is
    proteted type Bounded_Buffer(Max:Integer) is
        entry Insert(item:Integer);
        entry Remove(item:out Integer);
        Buffer=array[1...Max] of Integer
        Head,Tail,count=0,Natural=0;
    end Bounded_Buffer
    protected body Bounded_Buffer is
     entry Insert(item:Integer) count<Max is
        begin
            count=count+1;
            Tail=(Tail)Mod Max+1;
            Buffer[Tail]=item
        end Insert
     entry Remove(item:out Integer)count>0 is
        begin
            count=count-1;
            item=Buffer(Head)
            Head=(Head)%Mod Max+1
        end Remove
    end Bounded_Buffer
    Buffer :Bounded_Buffer(5);
    task producer;
    task Consumer;
    task producer is 
        begin
        for I in 1 .. 10 loop
            Buffer.Insert(I);
            Put_Line("Produced :"Integer'Image(I))
        end loop
    end producer;
    task Consumer is
        value:Integer;
        for I in 1 .. 10 loop 
            Buffer.Remove(value)
            put_Line("Consumed Item"Integer'Image(value))
        end loop
    end Consumer
begin   
    null
end producer_consumer_system
