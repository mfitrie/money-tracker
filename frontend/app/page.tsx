"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import CustomBreadcrumb from '@/components/other-component/custom-breadcrumb'
import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createTransaction, getTransactions, ResponseGetTransactionDTO } from '@/lib/queries/transaction'
import dayjs from "dayjs";
import { formatRMCurrency } from '@/utils/utils'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { getCatogories, ResponseGetCategoryDTO } from '@/lib/queries/category'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { Controller, useForm } from "react-hook-form";
import { CreateTransactionDTO, CreateTransactionDTOSchema } from '@/validation/transaction'
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from '@/components/ui/badge'


export default function HomePage() {
  //----------------------------------- useState -----------------------------------//
  const [currentPageTransaction, setCurrentPageTransaction] = useState(1);
  const itemsPerPageTransaction = 10; // Adjust as needed
  const offsetPageTransaction = (currentPageTransaction - 1) * itemsPerPageTransaction
  //----------------------------------- useState -----------------------------------//

  //----------------------------------- useForm -----------------------------------//
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<CreateTransactionDTO>({
    resolver: zodResolver(CreateTransactionDTOSchema),
    defaultValues: {
      account_id: "5551b832-680e-450a-8c6e-6ce45d51a23a", //TODO: for temp solution
      category_id: "",
      amount: undefined,
      type: "expense",
      description: "",
    },
  });
  const currentType = watch('type');
  //----------------------------------- useForm -----------------------------------//

  //----------------------------------- Query -----------------------------------//
  const queryClient = useQueryClient();
  const { data: transactionData, isLoading: isLoadingTransaction, error: errorTransaction } = useQuery<ResponseGetTransactionDTO>({
    queryKey: ['transactions', currentPageTransaction],
    queryFn: () => getTransactions(itemsPerPageTransaction, offsetPageTransaction),
  });
  const { data: categoryData, isLoading: isLoadingCategory, error: errorCategory } = useQuery<ResponseGetCategoryDTO>({
    queryKey: ['categories', currentType],
    queryFn: () => getCatogories({
      take: 10,
      offset: 0,
      type: currentType,
    }),
  });
  const {
    mutate: createTransactionMutation,
    isPending: isPendingCreateTransaction,
    isError,
    error,
    isSuccess,
    data
  } = useMutation<any, Error, CreateTransactionDTO>({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      reset({
        account_id: "5551b832-680e-450a-8c6e-6ce45d51a23a", //TODO: for temp solution
        category_id: "",
        amount: undefined,
        type: currentType,
        description: "",
      });
      toast.success("Transaction added");
    },
    onError: (error) => {
      console.error('Failed to create transaction:', error);
    },
  });
  //----------------------------------- Query -----------------------------------//

  function onSubmit(
    data: CreateTransactionDTO
  ) {
    createTransactionMutation(data);

  };





  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='w-full'>
        <CustomBreadcrumb />
      </div>
      <div>
        <ToggleGroup
          size="lg"
          type="single"
          value={currentType}
          onValueChange={(value) => {
            if (value) {
              setValue("type", value as any);
            }
          }}
        >
          <ToggleGroupItem
            className='cursor-pointer'
            size="lg"
            value="expense"
            aria-label="expense"
          >
            <span>Expense</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            className='cursor-pointer'
            size="lg"
            value="income"
            aria-label="income"
          >
            <span>Income</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='w-full'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="amount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className='flex flex-col gap-1'>
                      <div className="relative">
                        <span className="-translate-y-1/2 absolute top-1/2 left-2 h-3 w-3 text-muted-foreground">RM </span>
                        <Input
                          className="bg-background pl-9"
                          id="currency-input"
                          min="0"
                          placeholder="0.00"
                          step="0.01"
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? '' : parseFloat(value));
                          }}
                        />
                      </div>
                      {
                        fieldState.error && (
                          <p className="text-xs text-destructive">{fieldState.error.message}</p>
                        )
                      }
                    </div>
                  )}
                />

                <div>
                  {
                    errorCategory && (
                      <span className='text-destructive'>{errorCategory.message}</span>
                    )
                  }
                  {
                    isLoadingCategory && (
                      <Spinner />
                    )
                  }
                  {
                    !isLoadingCategory && (
                      <Controller
                        name="category_id"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categoryData?.data.map(item => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.error && (
                              <p className="text-xs text-destructive">{fieldState.error.message}</p>
                            )}
                          </div>
                        )}
                      />
                    )
                  }
                </div>

                <div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Description (Optional)"
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col'>
              <Button
                className='w-full cursor-pointer flex flex-row items-center justify-center'
                disabled={isPendingCreateTransaction}
                type='submit'
              >
                <span>Add</span>
                {
                  isPendingCreateTransaction && (
                    <Spinner />
                  )
                }
                {
                  !isPendingCreateTransaction && (
                    <Plus />
                  )
                }
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className='w-full'>
        <Card>
          <CardHeader>
            <CardTitle>List Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {
              errorTransaction && (
                <span>{errorTransaction.message}</span>
              )
            }
            {
              isLoadingTransaction && (
                <Spinner />
              )
            }
            {
              !isLoadingTransaction && (
                <Table>
                  <TableCaption>A list of your transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount (RM)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      transactionData && transactionData.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {
                              (() => {
                                switch(item.type){
                                  case "income": {
                                    return (
                                      <Badge>Income</Badge>
                                    )
                                  }
                                  case "expense": {
                                    return (
                                      <Badge variant="secondary">Expense</Badge>
                                    )
                                  }
                                }
                              })()
                            }
                          </TableCell>
                          <TableCell>
                            {
                              (() => {
                                if (!item.description || item.description.length === 0) {
                                  return "-"
                                }
                                return item.description;
                              })()
                            }
                          </TableCell>
                          <TableCell>{dayjs(item.created_at).format("D/M/YYYY")}</TableCell>
                          <TableCell>{formatRMCurrency(item.amount, false)}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Page {currentPageTransaction} of {transactionData?.pagination.total_pages}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              className='cursor-pointer'
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPageTransaction(prev => Math.max(prev - 1, 1))}
                              disabled={currentPageTransaction === 1}
                            >
                              Previous
                            </Button>
                            <Button
                              className='cursor-pointer'
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPageTransaction(prev => Math.min(prev + 1, transactionData?.pagination?.total_pages as any))}
                              disabled={currentPageTransaction === transactionData?.pagination.total_pages}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )
            }
          </CardContent>
        </Card>
      </div>
    </div>
  )
}